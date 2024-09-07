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
BOT_TOKEN="MTI2NjI3NTQwMTEwNjQ1NjU3Nw.GhMcqQ.jSN1sYexJrhMF4abkcJpTka_4h6XkTa1dUwB-E"
GUILD_ID="1266272983731929088"
VOICE_CHANNEL_ID="1266272983731929092"
YOUTUBE_URL="https://youtu.be/SUg6NiPLqFg"