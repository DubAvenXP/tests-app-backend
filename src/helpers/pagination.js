
const calculateNextPrev = (current, total, limit) => {
    limit = parseInt(limit);
    let previous = null, next = null;

    //Previous
    if (!(current <= 0)) {
        const aux = current - limit;
        const from_ = (total - limit) >= 0 ? aux <= 0 ? 0 : aux : 0;
        previous = `?offset=${from_}&limit=${limit}`;
    }
    //Next
    if (!(total - current) <= 0) {
        const aux = (total - (total - current) + limit);
        if (!(aux - total >= 0)) {
            const from_ = aux >= 0 ? aux : null;
            next = `?offset=${from_}&limit=${limit}`;
        }
    };

    return {
        previous,
        next
    };
};

module.exports = { calculateNextPrev };