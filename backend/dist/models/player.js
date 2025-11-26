"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const playerSchema = new mongoose_1.Schema({
    id: String,
    Agents_len: Number,
    tournament: String,
    stages: String,
    match_type: String,
    name: { type: String, required: true },
    team: String,
    agents: { type: [String], default: [] },
    rounds_played: Number,
    rating: Number,
    acs: Number,
    kd: Number,
    kast: Number,
    adr: Number,
    kpr: Number,
    apr: Number,
    fkpr: Number,
    fdpr: Number,
    hs: Number,
    clutch_success: Number,
    clutches: String,
    max_kills: Number,
    kills: Number,
    deaths: Number,
    assists: Number,
    fk: Number,
    fd: Number,
    photo: String
}, { timestamps: true });
playerSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        returnedObject._id = returnedObject._id.toString();
        delete returnedObject.__v;
    },
});
const Player = mongoose_1.default.model("Player", playerSchema);
exports.default = Player;
