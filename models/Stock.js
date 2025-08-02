const mongoose = require('mongoose');

const [form, setForm] = useState({
  item: '',
  quantity: '',
  category: '',
  unit: '',
  supplier: ''
});


module.exports = mongoose.model('Stock', stockSchema);

