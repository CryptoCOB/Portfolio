const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    completion: { type: Date, required: true },
    description: { type: String, required: true },

    outcome: { type: String },
    tech: { type: [String], default: [] },
    icon: { type: String },
    status: { type: String },
    gradient: { type: String },
    githubUrl: { type: String },
    liveUrl: { type: String },
    hasNotebook: { type: Boolean },
    notebookUrl: { type: String },
    hasSchema: { type: Boolean },
    schemaUrl: { type: String },
    hasMusic: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
