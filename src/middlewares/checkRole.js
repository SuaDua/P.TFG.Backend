export default function checkRole(requiredRole) {
  return (req, res, next) => {
    if (req.user?.role === requiredRole) {
      next();
    } else {
      res.status(403).json({ message: 'Acceso denegado' });
    }
  };
}