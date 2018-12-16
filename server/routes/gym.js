/* eslint-disable no-underscore-dangle */
const express = require('express');
const EquipmentHistory = require('../models/equipmentHistoryModel');
const Equipment = require('../models/equipmentModel');


const Router = express.Router();

// get equipment usage history for a member for a given time period
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

// get total time an equipment is used for a given time period
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

// get total time an equipment is used per day of the week for a given time period
Router.post('/equipment_day_of_week_times', (req, res) => {
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
          equipmentName,
          inTime: {
            $gte: new Date(new Date() - daysPerPeriod[timePeriod] * 60 * 60 * 24 * 1000),
          },

        },
      },

      {
        $project: {
          equipmentName: '$equipmentName',
          minutesUsed: { $divide: [{ $subtract: ['$outTime', '$inTime'] }, 60000] },
          useDate: '$inTime',
        },
      },

      {
        $group: {
          _id: { dayWeek: { $dayOfWeek: '$useDate' } },
          totalMinutes: { $sum: '$minutesUsed' },
        },
      },

    ],
  ).exec((err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: 'No data found', data: {} });
    }
    return res.json({ code: 0, data: doc });
  });
});

// get list of equipment names
Router.get('/list_equipment_names', (req, res) => {
  Equipment.aggregate(
    [
      {
        $group: {
          _id: { equipmentName: '$equipmentName' },
        },
      },

      {
        $sort: { '_id.equipmentName': 1 },
      },
    ],
  ).exec((err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: 'No data found', data: {} });
    }
    return res.json({ code: 0, data: doc });
  });
});

// get total time an equipment is used per hour of the day for a given time period
Router.post('/equipment_hourly_times', (req, res) => {
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
          equipmentName,
          inTime: {
            $gte: new Date(new Date() - daysPerPeriod[timePeriod] * 60 * 60 * 24 * 1000),
          },
        },
      },


      {
        $project: {
          equipmentName: '$equipmentName',
          hour: { $hour: '$inTime' },
          minutesUsed: { $divide: [{ $subtract: ['$outTime', '$inTime'] }, 60000] },
        },
      },

      {
        $group: {
          _id: { hour: '$hour', equipmentName: '$equipmentName' },
          totalMinutes: { $sum: '$minutesUsed' },
        },
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
