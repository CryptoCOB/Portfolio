const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number },
    published: { type: Boolean, default: true },

    icon: { type: String },
    blurb: { type: String },
    details: { type: String },
    features: { type: [String], default: [] },
    gradient: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', ServiceSchema);
