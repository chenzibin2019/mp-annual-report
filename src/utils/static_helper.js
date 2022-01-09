import { daysInYear, daysInMonth } from './date_utils';
import API from '../service/api';
import braces from 'braces';

const subs_scene = {
    1: '公众号搜索',
    17: '名片分享',
    30: '扫描二维码',
    51: '支付后关注（在支付完成页）',
    57: '文章内账号名称',
    100: '微信广告',
    161: '他人转载',
    200: '视频号',
    201: '直播',
    0: '其他合计'
};

const dataFetcher = async (config, module, year, month, day) => {
    return new Promise(async (resolve, reject) => {
        if (!config || !config.access_token) {
            reject('配置丢失');
        }

        /*
        fetch(`${config.proxy_server}/data.php?module=${module}&date=${year}-${month}-${day}&access_token=${config.access_token}`)
            .then(resp => resp.json()).then(res => {
                resolve(res);
            }).catch(err => reject(err));
            */

        fetch(`${API.datacube}${module}?access_token=${config.access_token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                begin_date: `${year}-${month}-${day}`,
                end_date: `${year}-${month}-${day}`
            })
        }).then(resp => resp.json()).then(res => {
            resolve(res);
        }).catch(error => {
            reject(error)
        })
    })
}

const getRaw = async (config, year, callback) => {
    const article_data = {};
    const user_data = {};
    const message_data = {};
    const cumulate_user_data = {};
    const total_days = daysInYear(year);
    let initial_followers = -1;
    let final_followers = 0;
    for (let month = 1; month <= 12; month++) {
        article_data[month] = {};
        user_data[month] = {};
        message_data[month] = {};
        const days = daysInMonth(year, month);
        for (let d = 1; d <= days; d++) {
            // fetch article data 
            try {
                const article = await dataFetcher(config, 'getarticletotal', year, month, d);
                if (article.list) {
                    article_data[month][d] = article.list;
                } else {
                    article_data[month][d] = false;
                }
                const user = await dataFetcher(config, 'getusersummary', year, month, d);
                if (user.list) {
                    user_data[month][d] = user.list;
                } else {
                    user_data[month][d] = false;
                }
                const message = await dataFetcher(config, 'getupstreammsg', year, month, d);
                if (message.list) {
                    message_data[month][d] = message.list;
                } else {
                    message_data[month][d] = false;
                }
                const cumulate_user = await dataFetcher(config, 'getusercumulate', year, month, d);
                if (cumulate_user.list) {
                    cumulate_user_data[cumulate_user.list[0].ref_date] = cumulate_user.list[0].cumulate_user;
                    if (initial_followers === -1) {
                        initial_followers = cumulate_user.list[0].cumulate_user;
                    }
                    final_followers = cumulate_user.list[0].cumulate_user;
                }
                callback(total_days);
            } catch (err) {
                console.error(err);
            } finally {

            }
        }

    }

    return { article_data, user_data, message_data, cumulate_user_data, initial_followers, final_followers };
}

const analytics = (year, data) => {
    const { article_data, user_data, message_data } = data;
    const report_article = [];
    const report_message = {};
    const article_plot_data = {};
    const article_share_plot_data = {};
    const article_target_user_plot_data = {};
    const user_subscribe_digest = [];
    let running_days = 0;
    let article_count = 0;
    let read_count = 0;
    let max_daily_reading = 0;
    let max_daily_read_day = { month: 0, day: 0 };
    let max_daily_read_headline = '';
    let max_daily_read_url = '';
    let max_sharing_count = 0;
    let max_sharing_article = '';
    let max_sharing_article_url = '';
    let max_read_count = 0;
    let max_article = '';
    let max_article_url = '';
    let max_article_day = '';
    let total_share_count = 0;
    let followers_increase = 0;
    let followers_decrease = 0;
    let subscribe_scene = {};
    let message_total = 0;
    let message_max_count = 0;
    let message_max_day = { month: 0, day: 0 };
    let message_user_plot_data = {};
    let message_count_plot_data = {};
    for (let month = 1; month <= 12; month++) {
        const days = daysInMonth(year, month);
        const monthly_article_data = article_data[month];
        const monthly_user_data = user_data[month];
        const monthly_message_data = message_data[month];
        report_message[month] = {};
        for (let day = 1; day <= days; day++) {
            // process article data 
            report_message[month][day] = [];
            if (monthly_article_data.hasOwnProperty(day) && monthly_article_data[day].length > 0) {
                let day_read_count = 0;
                let day_share_count = 0;
                let target_user = 0;
                running_days++;
                for (const article of monthly_article_data[day]) {
                    report_article.push({
                        title: article.title, url: article.url, 
                        date: article.ref_date, 
                        month,
                        day,
                        ...article.details[article.details.length - 1]
                    });
                    if (article.details[article.details.length - 1].int_page_read_user > max_read_count) {
                        max_read_count = article.details[article.details.length - 1].int_page_read_user;
                        max_article = article.title;
                        max_article_url = article.url;
                        max_article_day = `${month}-${day}`;
                    }
                    article_count++;
                    target_user = article.details[article.details.length - 1].target_user;
                    read_count += article.details[article.details.length - 1].int_page_read_user;
                    day_read_count += article.details[article.details.length - 1].int_page_read_user;
                    const share_count = article.details[article.details.length - 1].share_user_total;
                    if (share_count) {
                        total_share_count += share_count;
                        day_share_count += share_count;
                    }
                    if (share_count > max_sharing_count) {
                        max_sharing_count = share_count;
                        max_sharing_article = article.title;
                        max_sharing_article_url = article.url;
                    }
                }
                if (day_read_count > max_daily_reading) {
                    max_daily_reading = day_read_count;
                    max_daily_read_day = { month, day };
                    max_daily_read_headline = monthly_article_data[day][0].title;
                    max_daily_read_url = monthly_article_data[day][0].url;
                }
                article_plot_data[`${year}-${month}-${day}`] = day_read_count;
                article_share_plot_data[`${year}-${month}-${day}`] = day_share_count;
                article_target_user_plot_data[`${year}-${month}-${day}`] = target_user;
            }
            // process user data
            if (monthly_user_data.hasOwnProperty(day) && monthly_user_data[day].length > 0) {
                for (const record of monthly_user_data[day]) {
                    if (!subscribe_scene.hasOwnProperty(record.user_source)) {
                        subscribe_scene[record.user_source] = { inc: 0, dec: 0 };
                    }
                    subscribe_scene[record.user_source].inc += record.new_user;
                    subscribe_scene[record.user_source].dec += record.cancel_user;
                    followers_increase += record.new_user;
                    followers_decrease += record.cancel_user;
                }
            }
            // process message data
            if (monthly_message_data.hasOwnProperty(day) && monthly_message_data[day].length > 0) {
                let message_user = 0;
                let message_count = 0;
                for (const record of monthly_message_data[day]) {
                    message_user += record.msg_user;
                    message_count += record.msg_count;
                }
                message_user_plot_data[monthly_message_data[day][0].ref_date] = message_user;
                message_count_plot_data[monthly_message_data[day][0].ref_date] = message_count;
                if (message_count > message_max_count) {
                    message_max_count = message_count;
                    message_max_day = { month, day };
                }
                message_total += message_count;
            }

        }

    }
    // process user subscribe
    for (const scene in subscribe_scene) {
        let scene_name = '未知场景';
        if (subs_scene.hasOwnProperty(scene)) {
            scene_name = subs_scene[scene];
        }
        user_subscribe_digest.push({ scene_name, ...subscribe_scene[scene] });
    }

    return {
        running_days,
        article_count,
        read_count,
        max_daily_reading,
        max_daily_read_day,
        max_daily_read_headline,
        max_daily_read_url,
        max_read_count,
        max_article,
        max_article_url,
        max_article_day,
        max_sharing_count,
        max_sharing_article,
        max_sharing_article_url,
        total_share_count,
        followers_decrease,
        followers_increase,
        subscribe_scene,
        message_total,
        message_max_count,
        message_max_day,
        message_user_plot_data,
        message_count_plot_data,
        article_plot_data,
        article_share_plot_data,
        article_target_user_plot_data,
        user_subscribe_digest,
        report_article
    };
}

export async function getArticleStatics(config, year, fetcherCallback, statusCallback) {
    console.log(config);
    return new Promise(async (resolve, reject) => {
        try {
            statusCallback(1);
            const raw_data = await getRaw(config, year, fetcherCallback);
            statusCallback(2);
            const analytics_data = analytics(year, raw_data);
            statusCallback(3);
            resolve({
                raw_data,
                analytics_data
            });
        } catch (err) {
            reject(err);
        }
    })

}