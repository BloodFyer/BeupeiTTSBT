const BOT_TOKEN = process.env["BOT_TOKEN"]!;
const GUILD_ID = process.env["GUILD_ID"]!;
const CHANNEL_ID = process.env["VOICE_CHANNEL_ID"]!;
const YOUTUBE_URL = process.env["YOUTUBE_URL"]!;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

const connection = joinVoiceChannel({
	channelId: CHANNEL_ID,
	guildId: GUILD_ID,
	adapterCreator: client.guilds.cache.get(GUILD_ID)?.voiceAdapterCreator!,
});

const job = () => {
	const player = createAudioPlayer();
	connection.subscribe(player);

	const stream = ytdl(YOUTUBE_URL, {filter: "audioonly"});
	stream.on("error", (err) => console.error(err));

	const resource = createAudioResource(stream);

	player.play(resource);
};

client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);

    job();
})

client.login(BOT_TOKEN);









// .env
BOT_TOKEN="봇 토큰"
GUILD_ID="디스코드 서버 ID"
VOICE_CHANNEL_ID="음성 채널 ID"
YOUTUBE_URL="유튜브 링크"
