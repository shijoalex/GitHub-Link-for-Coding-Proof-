const http = require("http")

http.createServer((req, res) => {
    const requestUrl = new URL(req.url, `http://${req.headers.host}`)
    const userPath = requestUrl.pathname.match(/^\/users\/([^/]+)$/)

    res.setHeader("Content-Type", "application/json")

    if (userPath) {
        res.end(JSON.stringify({
            urlParameter: userPath[1],
            queryParameter: Object.fromEntries(requestUrl.searchParams)
        }))
        return
    }

    res.end(JSON.stringify({
        message: "Use /users/:id?key=value"
    }))
}).listen(3000, () => {
    console.log("Node.js server running at http://localhost:3000")
})
