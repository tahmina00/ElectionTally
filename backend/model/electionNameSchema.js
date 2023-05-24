const mongoose = require("mongoose");

const electionNameSchema = new mongoose.Schema({
	electionid: {
		type: Number,
        unique: true
	},
	banglaelectionname : {
		type:String,
		required:true
	 },
	englishelectionname : {
		type:String,
		required:true
	 },
	 statusfordisplay : {
		type: Number,
        default: 1
	 },
  createdAt: {
    type: Date,
    default: Date.now
  }
	 });
	 

// Define a pre-save hook
electionNameSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastRecord = await this.constructor.findOne({}, { electionid: 1 }).sort({ electionid: -1 });
	console.log('lastRecord');console.log(lastRecord);
    const nextValue = lastRecord ? lastRecord.electionid + 1 : 1;
    this.electionid = nextValue;
  }
  next();
});
	
	 
const Electionname = new mongoose.model("ELECTIONNAME", electionNameSchema);


module.exports = Electionname;


