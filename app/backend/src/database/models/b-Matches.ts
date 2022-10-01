import { Model, INTEGER } from 'sequelize';
import db from '.';
import Teams from './a-Teams';

class Matches extends Model {
    id!: number;
    home_team!: number;
    home_team_goals!: number;
    away_team!: number;
    away_team_goals!: number;
    in_progress!: number;
    static associate: (models: any) => void;
}

Matches.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    home_team: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: 'teams',
            key: 'id'
        }
    },
    home_team_goals: {
        type: INTEGER,
        allowNull: false,
    },
    away_team: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: 'teams',
            key: 'id'
        }
    },
    away_team_goals: {
        type: INTEGER,
        allowNull: false,
    },
    in_progress: {
        type: INTEGER,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'home_team', as: 'home_team'});
Matches.belongsTo(Teams, { foreignKey: 'away_team', as: 'away_team'});

export default Matches;