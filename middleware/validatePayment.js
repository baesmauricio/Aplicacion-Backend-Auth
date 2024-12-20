// const validatePayment = (req, res, next) => {
//     const { items, payer, back_urls } = req.body;
  
//     if (!items || !items.length) {
//       return res.status(400).json({ message: 'Falta el campo items en la solicitud.' });
//     }
  
//     if (!payer || !payer.email) {
//       return res.status(400).json({ message: 'Falta el campo payer.email en la solicitud.' });
//     }
  
//     if (!back_urls || !back_urls.success || !back_urls.failure || !back_urls.pending) {
//       return res.status(400).json({ message: 'Faltan los campos requeridos en back_urls.' });
//     }
  
//     if (!idempotencyKey) {
//       return res.status(400).json({ message: 'Falta el campo idempotencyKey en la solicitud.' });
//     }
  
//     next();
//   };
  
//   module.exports = validatePayment;
  