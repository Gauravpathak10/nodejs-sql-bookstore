const db = require('../dbConfig');

const getBooks = (req, res) => {
    try {
        const getbooksQuery = "SELECT * FROM books"
        db.query(getbooksQuery, (err, data) => {
            if (err) {
                return res.status(404).json({
                    message: "unsuccess",
                    status: false,
                })
            }
            return res.status(200).json({
                message: "success",
                status: true,
                data: data
            })
        })
    } catch (error) {
        return res.json(error);
    }

}

const getSingleBook = (req, res) => {
    const bookId = req.params.id;
    try {
        const getbooksQuery = "SELECT * FROM books WHERE id = ?"
        db.query(getbooksQuery,[bookId], (err, data) => {
            if (err) {
                return res.status(404).json({
                    message: "unsuccess",
                    status: false,
                })
            }
            return res.status(200).json({
                message: "success",
                status: true,
                data: data
            })
        })
    } catch (error) {
        return res.json(error);
    }

}
const createBook = (req, res) => {
    try {
        const create = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";
        const values = [
            req.body.title,
            req.body.desc,
            req.body.price,
            req.body.cover,
        ];
        db.query(create, [values], (err, data) => {
            if (err) {
                return res.status(404).json({
                    message: err,
                    status: false,
                })
            }
            return res.status(200).json({
                message: "successfully stored",
                status: true,
                data: data
            })
        })
    } catch (error) {
        return res.json(error);
    }
}


const updateBook = (req, res) => {
    const bookId = req.params.id;
    try {
        const update =  "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
        const values = [
            req.body.title,
            req.body.desc,
            req.body.price,
            req.body.cover,
        ];
        db.query(update,[...values,bookId], (err, data) => {
            if (err) {
                return res.status(404).json({
                    message: err,
                    status: false,
                })
            }
            return res.status(200).json({
                message: "successfully updated",
                status: true,
                data: data
            })
        })
    } catch (error) {
        return res.json(error);
    }
}


const deleteBook = (req, res) => {
    const bookId = req.params.id;
    try {
        const deleteBook =  " DELETE FROM books WHERE id = ? ";
        db.query(deleteBook,[bookId], (err, data) => {
            if (err) {
                return res.status(404).json({
                    message: err,
                    status: false,
                })
            }
            return res.status(200).json({
                message: "successfully deleted",
                status: true,
                data: data
            })
        })
    } catch (error) {
        return res.json(error);
    }
}





const controls = { getBooks, createBook ,updateBook,deleteBook,getSingleBook}
module.exports = controls;;