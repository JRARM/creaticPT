const router = require("express").Router();
const Test = require("../model/test.model");
const { faker } = require("@faker-js/faker");

router.get("/tests", async (req, res) => {
    const test = await Test.findAll();
    res.status(200).json({
        ok: true,
        status: 200,
        body: test
    });

});
router.get("/tests/:test_id", async (req, res) => {
    const id = req.params.test_id;
    const test = await Test.findOne({
        where: { test_id: id }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: test
    });
});
router.post("/tests", async (req, res) => {
    const dataTest = req.body;
    await Test.sync();
    const newtest = await Test.create({
        test_name: dataTest.test_name,
        test_description: dataTest.test_description,
        test_isactive: dataTest.test_isactive
    });
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Test successfuly created"
    });
});
router.put("/tests/:test_id", async (req, res) => {
    const id = req.params.test_id;
    const dataTest = req.body;
    const updateTest = await Test.update({
        test_name: dataTest.test_name,
        test_description: dataTest.test_description,
        test_isactive: dataTest.test_isactive
    }, { where: { test_id: id } });
    res.status(200).json({
        ok: true,
        status: 200,
        body: updateTest
    })
});
router.delete("/tests/:test_id", async (req, res) => {
    const id = req.params.test_id;
    const delTest = await Test.destroy({ where: { test_id: id } })

    res.status(204).json({
        ok: true,
        stataus: 204,
        body: delTest
    })
});

module.exports = router;