# Profanity Telegram Bot

Simple profanity detection bot Using the free API [Here](https://profanity.dev/), deployed on cloudflare workers.

Simply advices to not use profanity in the chat.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/fauzaanu/zyloxbot)

### Important

Add an environment variable `TELEGRAM_API_KEY` inside the workers dashboard or even in the wrangler.toml file.
This is the API key for the telegram bot. You can get it by creating a new bot on telegram and getting the API key from BotFather.
