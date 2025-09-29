"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOnboardingTaskById = exports.createOnboardingTask = exports.getOnboardingTasks = void 0;
const prismaClient_1 = require("../prismaClient");
const validation_1 = require("@shared/validation");
// GET /onboarding-tasks
const getOnboardingTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield prismaClient_1.prisma.onboardingTask.findMany();
        res.json(tasks);
    }
    catch (e) {
        res
            .status(500)
            .json({ message: `Error retrieving onboarding tasks: ${e.message}` });
    }
});
exports.getOnboardingTasks = getOnboardingTasks;
// POST /onboarding-tasks
const createOnboardingTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = validation_1.OnboardingCreateSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid input",
                errors: (0, validation_1.zodErrorFormatter)(result.error),
            });
            return;
        }
        const task = yield prismaClient_1.prisma.onboardingTask.create({
            data: Object.assign(Object.assign({}, result.data), { completed: false, completedAt: null }),
        });
        res.status(201).json(task);
    }
    catch (e) {
        res
            .status(500)
            .json({ message: `Error creating onboarding task: ${e.message}` });
    }
});
exports.createOnboardingTask = createOnboardingTask;
// PATCH /onboarding-tasks/:id
const updateOnboardingTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = validation_1.IdParamSchema.safeParse(req.params);
    if (!result.success) {
        res.status(400).json({
            message: "Invalid id type",
            errors: (0, validation_1.zodErrorFormatter)(result.error),
        });
        return;
    }
    const body = validation_1.OnboardingUpdateSchema.safeParse(req.body);
    if (!body.success) {
        res.status(400).json({
            message: "Invalid input",
            errors: (0, validation_1.zodErrorFormatter)(body.error),
        });
        return;
    }
    const found = yield prismaClient_1.prisma.onboardingTask.findUnique({
        where: { id: result.data.id },
    });
    if (!found) {
        res.status(404).json({ message: "Onboarding task not found" });
        return;
    }
    const task = yield prismaClient_1.prisma.onboardingTask.update({
        where: { id: result.data.id },
        data: body.data,
    });
    res.json(task);
});
exports.updateOnboardingTaskById = updateOnboardingTaskById;
//# sourceMappingURL=onboardingController.js.map