import Post from "../../models/posts.js";
import User from "../../models/users.js";

//get all posts
export const getAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            include: [{
                model: User,
                as: "user",
                attributes: {
                    exclude: [
                        'password',
                        'first_name',
                        'surname',
                        'address',
                        'postcode',
                        'phone',
                        'createdAt',
                        'updatedAt'
                    ]
                },
                required: true
            }]
        });
        if (allPosts.length) {
            res.status(200).send({
                success: true,
                posts: allPosts
            });
        } else {
            //Send no content client response
            res.status(204).send({
                success: true,
                posts: allPosts
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error: error.message });
    }
};

//get all posts
export const createAPost = async (req, res) => {
    try {
        //***check if user exist */
        if (req.body.username) {
            const user = await User.findOne({ where: { username: req.body.username } })
            if (user) {
                const newPost = await Post.create(
                    {
                        title: req.body.title,
                        description: req.body.description,
                        userId: user.id
                    },
                );
                res.status(200).send({
                    success: true,
                    posts: newPost
                });
            } else {
                res.status(404).send({
                    success: true,
                });
            }
        } else {
            throw new Error("Invalid details.");
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error: error.message });
    }
};