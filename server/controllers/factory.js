function crudController(Model) {
  return {
    async list(req, res) {
      const docs = await Model.find({}).exec();
      res.json(docs);
    },
    async get(req, res) {
      const doc = await Model.findById(req.params.id).exec();
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    },
    async create(req, res) {
      const doc = await Model.create(req.body);
      res.status(201).json(doc);
    },
    async update(req, res) {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    },
    async remove(req, res) {
      const doc = await Model.findByIdAndDelete(req.params.id).exec();
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json({ ok: true });
    },
    async removeAll(req, res) {
      await Model.deleteMany({}).exec();
      res.json({ ok: true });
    },
  };
}

module.exports = { crudController };
