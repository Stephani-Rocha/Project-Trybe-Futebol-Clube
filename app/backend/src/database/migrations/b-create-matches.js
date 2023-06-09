module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('matches', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        home_team: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          references: {
            model: {
              tableName: 'teams',
            },
            key: 'id'
          }
        },
        home_team_goals: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        away_team: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          references: {
            model: {
              tableName: 'teams',
            },
            key: 'id'
          }
        },
        away_team_goals: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        in_progress: {
            type: Sequelize.INTEGER,
            allowNull: false,
          }
      })
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('matches');
    }
  };