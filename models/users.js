module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le nom est déjà pris."
            },
        },
        password: {
            type: DataTypes.STRING,
            validate:{
                len: {
                    args:[8],
                    msg:"Le mot de passe doit contenir au minimum 8 caractères"
                }
                
            }
        }
    }
    );
}