"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectModel = exports.TopicModel = exports.QuestionModel = exports.OptionModel = void 0;
const mongoose_1 = require("mongoose");
const OptionSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
    },
    images: [String],
    isAnswer: Boolean,
});
const QuestionSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['simple', 'medium', 'hard'],
        required: true,
    },
    options: {
        type: [OptionSchema],
        required: true,
        validate: [
            {
                validator: (v) => Array.isArray(v) && v.length > 0,
                message: 'At least one option is required',
            },
            {
                validator: (v) => v.some((opt) => opt.isAnswer === true),
                message: 'At least one option is required',
            }
        ],
    },
    images: [String],
});
const TopicSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    questions: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Question',
        }],
});
const SubjectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    topics: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Topic',
        }],
});
const OptionModel = (0, mongoose_1.model)('Option', OptionSchema);
exports.OptionModel = OptionModel;
const QuestionModel = (0, mongoose_1.model)('Question', QuestionSchema);
exports.QuestionModel = QuestionModel;
const TopicModel = (0, mongoose_1.model)('Topic', TopicSchema);
exports.TopicModel = TopicModel;
const SubjectModel = (0, mongoose_1.model)('Subject', SubjectSchema);
exports.SubjectModel = SubjectModel;
//# sourceMappingURL=questionbank.js.map