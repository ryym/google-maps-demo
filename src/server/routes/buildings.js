const router = require('express').Router();
const buildingService = require('../service/buildingService');

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
});

/**
 * 全ての建物情報を返す。
 */
router.get('/', (req, res) => {
  buildingService.listAll()
    .then(buildings => res.json(buildings));
});

/**
 * 指定されたIDの建物情報を返す。
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  buildingService.findById(id)
    .then(building => {
      if (! building) {
        respondError(id, res);
      }
      res.json(building);
    });
});

/**
 * 指定されたIDの建物の周辺にある
 * 建物情報を返す。
 */
router.get('/:id/neighbors', (req, res) => {
  const { id } = req.params;
  const radius = parseInt(req.query.radius, 10) || 1000;
  buildingService.listNeighborsOf(id, radius)
    .then(neighbors => {
      if (! neighbors) {
        respondError(id, res);
      }
      res.json({ neighbors });
    });
});

function respondError(id, res) {
  res.json({
    error: `Invalid id: ${id}`
  });
}

module.exports = router;
