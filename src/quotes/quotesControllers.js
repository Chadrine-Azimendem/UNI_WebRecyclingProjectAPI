import Service from "../models/services.js";

//Get services that match keyword
export const getAService = async (req, res) => {
    try {
        const service = await Service.findOne({
            where: {
                description: req.body.wasteType,
                category: req.body.category
            },
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt'
                ]
            }
        });

        console.log("service", service)
        if (service) {
            res.status(200).send({
                success: true,
                service: service,
            });
        } else {
            //Send no content client response
            res.status(204).send({
                success: true,
                service: ["No service found"]
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error: error.message });
    }
};

//Retrieve all the services for businesses
export const getAllServicesForBusiness = async (req, res) => {
    try {
        const allServices = await Service.findAll({
            where: {
                category: "Business Waste"
            },
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt',
                    'monthlyPrice',
                    'oneTimePickup'
                ]
            }
        });
        if (allServices.length) {
            res.status(200).send({
                success: true,
                allServices: allServices
            });
        } else {
            //Send no content client response
            res.status(204).send({
                success: true
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error: error.message });
    }
};

//Retrieve all the services for domestic waste
export const getAllServicesForHouses = async (req, res) => {
    try {
        const allServices = await Service.findAll({
            where: {
                category: "Domestic Waste"
            },
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt',
                    'monthlyPrice',
                    'oneTimePickup'
                ]
            }
        });
        if (allServices.length) {
            res.status(200).send({
                success: true,
                allServices: allServices
            });
        } else {
            //Send no content client response
            res.status(204).send({
                success: true
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error: error.message });
    }
};