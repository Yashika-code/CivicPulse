import { Complaint } from "../models/complaint.model.js";
import { generateComplaintId } from "../utils/generateComplaintId.js";
import cloudinary from "../config/cloudinary.js";

export const createComplaint = async (req, res) => {
  try {
    const { title, description, category, subCategory, location } = req.body;

    if (!title || !description || !category || !subCategory || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          {
            folder: "civicpulse/complaints"
          }
        );
        imageUrls.push(result.secure_url);
      }
    }

    const complaint = await Complaint.create({
      complaintId: generateComplaintId(),
      title,
      description,
      category,
      subCategory,
      location,
      images: imageUrls,
      citizen: req.user._id,
    });

    res.status(201).json({
      message: "Complaint submitter successfully",
      complaint
    });
  } catch (error) {
    res.status(500).json({ 
      message: error.message || "Server error" 
    });
  }
};

export const getMyComplaints = async (req, res) => {
  const complaints = await Complaint.find({ citizen: req.user._id });
  res.json(complaints);
};

export const getAssignedComplaints = async (req, res) => {
  const complaints = await Complaint.find({
    assignedOfficer: req.user._id,
  }).populate("citizen", "name email");

  res.json(complaints);
};

export const updateComplaintStatus = async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint.assignedOfficer ||
    complaint.assignedOfficer.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  complaint.status = req.body.status;
  await complaint.save();

  res.json(complaint);
};
