// Jobs posted per month (for chart)
router.get("/:employerId/monthly", (req, res) => {
  const employerId = req.params.employerId;

  db.query(
    `SELECT DATE_FORMAT(created_at, '%b') AS month, COUNT(*) AS count
     FROM jobs
     WHERE employer_id = ?
     GROUP BY MONTH(created_at)
     ORDER BY MIN(created_at) ASC`,
    [employerId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});
