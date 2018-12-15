/* eslint-disable no-underscore-dangle */
const express = require('express');
const EquipmentHistory = require('../models/equipmentHistoryModel');
const Equipment = require('../models/equipmentModel');


const Router = express.Router();


Router.post('/member_history', (req, res) => {
  const { userId, equipmentName, timePeriod } = req.body;
  const daysPerPeriod = {
    day: 1,
    week: 7,
    month: 30,
  };
  EquipmentHistory.aggregate(
    [
      {
        $match: {
          userId,
          equipmentName: new RegExp(equipmentName, 'i'),
          inTime: {
            $gte: new Date(new Date() - daysPerPeriod[timePeriod] * 60 * 60 * 24 * 1000),
          },
          outTime: {
            $ne: null,
          },
        },
      },


      {
        $project: {
          equipmentName: '$equipmentName',
          inTime: '$inTime',
          useDate: { $dateToString: { format: '%Y-%m-%d', date: '$inTime' } },
          minutesUsed: { $divide: [{ $subtract: ['$outTime', '$inTime'] }, 60000] },
        },
      },

      {
        $sort: { inTime: -1 },
      },
    ],
  ).exec((err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: 'No data found', data: {} });
    }
    return res.json({ code: 0, data: doc });
  });
});

Router.post('/equipment_times', (req, res) => {
  const { equipmentName, timePeriod } = req.body;
  const daysPerPeriod = {
    day: 1,
    week: 7,
    month: 30,
  };
  EquipmentHistory.aggregate(
    [
      {
        $match: {
          equipmentName: new RegExp(equipmentName, 'i'),
          inTime: {
            $gte: new Date(new Date() - daysPerPeriod[timePeriod] * 60 * 60 * 24 * 1000),
          },

        },
      },

      {
        $project: {
          equipmentName: '$equipmentName',
          minutesUsed: { $divide: [{ $subtract: ['$outTime', '$inTime'] }, 60000] },
        },
      },

      {
        $group: {
          _id: { equipmentName: '$equipmentName' },
          totalMinutes: { $sum: '$minutesUsed' },
        },
      },

      {
        $sort: { totalMinutes: -1 },
      },

    ],
  ).exec((err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: 'No data found', data: {} });
    }
    return res.json({ code: 0, data: doc });
  });
});


module.exports = Router;
