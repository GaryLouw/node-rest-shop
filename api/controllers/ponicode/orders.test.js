const orders = require("../orders")
// @ponicode
describe("orders.orders_delete", () => {
    test("0", () => {
        let result = orders.orders_delete({ params: { orderId: "7289708e-b17a-477c-8a77-9ab575c4b4d8" } }, { status: () => 500 }, false)
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result = orders.orders_delete({ params: { orderId: "7289708e-b17a-477c-8a77-9ab575c4b4d8" } }, { status: () => 404 }, false)
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result = orders.orders_delete({ params: { orderId: "7289708e-b17a-477c-8a77-9ab575c4b4d8" } }, { status: () => 400 }, false)
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result = orders.orders_delete({ params: { orderId: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9" } }, { status: () => 429 }, false)
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result = orders.orders_delete({ params: { orderId: "a85a8e6b-348b-4011-a1ec-1e78e9620782" } }, { status: () => 429 }, false)
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result = orders.orders_delete({ params: { orderId: "" } }, { status: () => -Infinity }, true)
        expect(result).toMatchSnapshot()
    })
})
