async function checkUserInChannel(chatId, userId, channelUsername, telegramApiKey) {
	const getChatMemberUrl = `https://api.telegram.org/bot${telegramApiKey}/getChatMember`;
	const response = await fetch(`${getChatMemberUrl}?chat_id=@${channelUsername}&user_id=${userId}`);
	const data = await response.json();
	console.log(data);
	return data.ok && ['member', 'administrator', 'creator'].includes(data.result.status);
}

async function sendTelegramMessage(chatId, text, telegramApiKey, reply_id) {
	const telegramApiUrl = `https://api.telegram.org/bot${telegramApiKey}/sendMessage`;
	const response = await fetch(telegramApiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			chat_id: chatId,
			text: text,
			reply_to_message_id: reply_id
		})
	});
	return response.ok;
}

async function isProfanity(text) {
	const message = text;
	const response = await fetch('https://vector.profanity.dev', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ message })
	});
	const data = await response.json();
	console.log(data);

	if (data.isProfanity) {
		return true;
	} else {
		return false;
	}
}


export default {
	async fetch(request, env, ctx) {
		let telegramUpdate;
		telegramUpdate = await request.json();
		const chatId = telegramUpdate.message.chat.id;
		const userId = telegramUpdate.message.from.id;
		const userMessage = telegramUpdate.message.text;

		console.log('Telegram Update:', telegramUpdate);

		if (await isProfanity(userMessage)) {
			await sendTelegramMessage(chatId,
				'Please do not use profanity in this chat.',
				env.TELEGRAM_API_KEY,
				telegramUpdate.message.message_id
			);
		}

		return new Response('Messages sent to Telegram successfully', { status: 200 });
	}
};
