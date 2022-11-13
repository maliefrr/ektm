const getAllUser = (req,res) => {
    res.status(200).json({
        statusCode: 200,
        message: "Succes"
    })
}

module.exports = {
    getAllUser
}