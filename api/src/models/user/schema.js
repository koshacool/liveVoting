const mongoose = require('mongoose');
const { EMAIL } = require('../../utils/regexes');
const { ADMIN, USER, SUPER_ADMIN, VOLUNTEER, MAlE, FEMALE } = require('../../middleware/permission-checker/roles');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const schema = new Schema({
  email: {
    type: String,
    required: [true],
    validate: {
      validator: email => EMAIL.test(email),
      message: 'Field [email] wrong format.',
    },
  },
  createAt: {
    type: Date,
    required: [true],
    index: true,
    default: new Date(),
  },
  isAgreeGDPR: {
		type: Boolean,
		required: [true],
		default: false,
  },
  approved: {
    type: Boolean,
    required: [true],
  },
  active: {
    type: Boolean,
    required: [true],
    default: true,
  },
  attachments: [{
    type: ObjectId,
    required: [true],
    default: [],
  }],
  documentApproval: {
    personalId: {
      type: Boolean,
      required: [true],
      default: false,
    },
    scanId: {
      type: Boolean,
      required: [true],
      default: false,
    }
  },
  roles: [{
    type: String,
    enum: [ADMIN, USER, SUPER_ADMIN, VOLUNTEER],
    required: [true],
  }],
  profile: {
    firstName:String,
    lastName:String,
    patronymic: String,
    display_name: {
      type: String,
      index: true,
    },
    birthDate: Date,
    imageId: {
      type: ObjectId,
      ref: 'Image'
    },
    gender: {
      type: String,
      enum: [MAlE, FEMALE],
    },
    phone: String,
    address: String,
    zipCode: Number,
    city: String,
    facebookUrl: String,
    school: String,
    firstParentName: String,
    firstParentPhone: String,
    secondParentName: String,
    secondParentPhone: String,
    knownFrom: String,
    volunteerActivity: String,
    education: String,
    contactPersonPhone: String,
    contactPersonName: String,
    hobby: String,
    followingAgreed: String,
  },
  isTemporaryPassword: {
    type: Boolean,
    default: false
  },
});

module.exports = { schema };