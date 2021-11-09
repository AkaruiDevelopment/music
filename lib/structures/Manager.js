"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __importDefault(require("./Player"));
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const constructs_1 = require("../utils/decorators/constructs");
const source_1 = require("../utils/source");
const voice_1 = require("@discordjs/voice");
const Search_1 = require("../utils/source/Search");
let Manager = class Manager extends tiny_typed_emitter_1.TypedEmitter {
    constructor(config) {
        super();
        this.players = new Map();
        this.providers = { twitch: new source_1.TwitchProvider(), soundcloud: new source_1.SoundcloudProvider({ clientId: undefined }) };
        this.searchManager = new Search_1.Search();
        this.config = config;
    }
    /**
     * joinVc
     */
    async joinVc({ voiceChannel, textChannel, debug = false }) {
        const data = {
            channelId: voiceChannel.id,
            guildId: voiceChannel.guildId,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            group: voiceChannel.client.user.id
        };
        const connection = (0, voice_1.joinVoiceChannel)(data);
        if (debug) {
            connection.on("debug", console.log);
        }
        connection.on('error', console.error);
        try {
            await (0, voice_1.entersState)(connection, voice_1.VoiceConnectionStatus.Ready, 30000);
            this.players.set(voiceChannel.guildId, new Player_1.default({ connection, voiceChannel, textChannel, manager: this }));
        }
        catch (error) {
            connection.destroy();
            console.error("joinVoiceChannelError :" + error);
        }
    }
};
Manager = __decorate([
    (0, constructs_1.constructManager)()
], Manager);
exports.default = Manager;
//# sourceMappingURL=Manager.js.map