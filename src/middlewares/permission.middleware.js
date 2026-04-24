// permission.middleware.js
module.exports = (...required) => (req, res, next) => {
  const userPermissions = req.user?.permissions || [];
  const hasAll = required.every((p) => userPermissions.includes(p));
  if (!hasAll) {
    return res.status(403).json({ success: false, message: 'Permission denied' });
  }
  next();
};
