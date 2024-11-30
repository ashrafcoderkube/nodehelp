
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const CategorySchema = new Schema({
  // String field with required validation, minimum length, maximum length, and default value
  stringField: {
    type: String,
    required: [true, 'String field is required'], // Field is required
    minlength: [5, 'String field must be at least 5 characters long'], // Minimum length constraint
    maxlength: [50, 'String field must be less than 50 characters long'], // Maximum length constraint
    default: 'Default String' // Default value if not provided
  },
  // Number field with required validation, minimum value, maximum value, and default value
  numberField: {
    type: Number,
    required: [true, 'Number field is required'], // Field is required
    min: [0, 'Number field must be at least 0'], // Minimum value constraint
    max: [100, 'Number field must be less than or equal to 100'], // Maximum value constraint
    default: 42 // Default value if not provided
  },
  // Date field with default value set to current date and time
  dateField: {
    type: Date,
    default: Date.now // Default value set to current date and time
  },
  // Buffer field for storing binary data (no specific validation or default value provided here)
  bufferField: Buffer,
  // Boolean field with default value
  booleanField: {
    type: Boolean,
    default: false // Default value if not provided
  },
  // Mixed field that can hold any type of value, with an empty object as default
  mixedField: {
    type: Schema.Types.Mixed,
    default: {} // Default value is an empty object
  },
  // ObjectId field for referencing another document (self-referencing for Category)
  objectIdField: {
    type: Schema.Types.ObjectId,
    ref: 'CategoryModel' // Reference to self (Category purposes only)
  },
  // Array field containing strings, with default values
  arrayField: {
    type: [String],
    default: ['defaultItem1', 'defaultItem2'] // Default array with two items
  },
  // Decimal128 field for high-precision decimal values
  decimal128Field: {
    type: Schema.Types.Decimal128,
    default: 0.0 // Default value is 0.0
  },
  // Map field for storing key-value pairs of strings
  mapField: {
    type: Map,
    of: String,
    default: new Map([['key1', 'value1'], ['key2', 'value2']]) // Default map with key-value pairs
  },
  // Nested object with fields containing default values
  nestedObject: {
    nestedString: {
      type: String,
      default: 'Nested Default String' // Default value for nestedString
    },
    nestedNumber: {
      type: Number,
      default: 10 // Default value for nestedNumber
    }
  },
  // List of lists containing nested arrays of numbers with default values
  listOfLists: {
    type: [[Number]],
    default: [[1, 2, 3], [4, 5, 6]] // Default list of lists with nested numbers
  },
  // List of objects with subfields and default values
  listOfObjects: {
    type: [{
      subField1: {
        type: String,
        default: 'SubField Default' // Default value for subField1
      },
      subField2: {
        type: Number,
        default: 100 // Default value for subField2
      }
    }],
    default: [{ subField1: 'Default1', subField2: 100 }, { subField1: 'Default2', subField2: 200 }] // Default array of objects
  },
  // Email field with validation for format, uniqueness, and trimming
  emailField: {
    type: String,
    required: [true, 'Email is required'], // Field is required
    unique: true, // Ensure uniqueness
    lowercase: true, // Convert to lowercase
    trim: true, // Trim whitespace
    match: [/S+@S+.S+/, 'Invalid email address'] // Validate format using regex
  }
}, {
  timestamps: true, // Add createdAt and updatedAt timestamps
  versionKey: false // Disable versioning
});

// Add index on emailField for uniqueness
CategorySchema.index({ emailField: 1 }, { unique: true });

// Middleware Category (pre-save hook for validation)
CategorySchema.pre('save', function(next) {
  // Add custom logic before saving
  console.log('Saving document...');
  next();
});

// Create the model based on the schema
const CategoryModel = mongoose.model('Category', CategorySchema);

// Export the model for use in other parts of the application
module.exports = CategoryModel;