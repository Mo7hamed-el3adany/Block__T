const Items = require("../models/itemModel");

const itemCtrl = {
  getItems: async (req, res) => {
    try {
      const items = await Items.find({ status: true });
      res.json({
        status: "success",
        items: items,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createItem: async (req, res) => {
    try {
      const { name, description } = req.body;
      const item = await Items.findOne({ name });
      if (item)
        return res.status(400).json({ msg: "This Product already exists." });
      const newItem = new Items({ name, description });
      await newItem.save();
      res.json({ msg: "Created a Item" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteItem: async (req, res) => {
    try {
      await Items.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted Item" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateItem: async (req, res) => {
    try {
      const { name, description } = req.body;

      await Items.findOneAndUpdate(
        { _id: req.params.id },
        { name, description }
      );

      res.json({ msg: "Updated a Product information" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getItem: async (req, res) => {
    try {
      const item = await Items.findById(req.params.id);
      res.json({
        status: "success",
        item: item,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = itemCtrl;
