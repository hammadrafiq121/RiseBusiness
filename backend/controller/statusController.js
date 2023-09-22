import Status from "../model/statusSchema.js";

export const getStatuses = async (req, res) => {
  try {
    const statuses = await Status.find();
    return res.json(statuses);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const addStatus = async (req, res) => {
  const { status } = req.body;
  console.log(status);

  try {
    const existingStatus = await Status.findOne({ status: status });
    console.log(existingStatus);
    if (existingStatus) {
      return res.status(400).json({ error: "Status already exists" });
    }
    const newStatus = await Status.create({
      status,
    });
    await newStatus.save();
    return res.status(200).json(newStatus);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getStatus = async (req, res) => {
  try {
    const statusId = req.params.id;
    const status = await Status.findById(statusId);
    return res.status(200).json(status);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateStatus = async (request, response) => {
  try {
    const statusId = request.params.id;
    const updatedStatus = await Status.findOneAndUpdate(
      { _id: statusId },
      request.body,
      {
        new: true,
      }
    );
    if (updatedStatus) {
      return response.status(200).json(updatedStatus);
    } else {
      return response.status(404).json({ error: "Status not updated" });
    }
  } catch (error) {
    return response.status(500).json({ error: "Failed to update Status" });
  }
};

export const deleteStutus = async (request, response) => {
  try {
    const statusId = request.params.id;
    const deletedStatus = await Status.findByIdAndDelete(statusId);
    return response.status(200).json(deletedStatus);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};
