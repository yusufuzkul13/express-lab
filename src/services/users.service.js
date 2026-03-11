/*
    Users Service
    İş mantığı ve veri erişimi burada gerçekleşir.
*/

let users = [
    {
        id: 1,
        name: "Yusuf",
        email: "ysfuzl101@gmail.com"
    },
    {
        id: 2,
        name: "Ali",
        email: "ali@example.com"
    }
];

let nextId = 3;

const findAll = () => {
    return users;
};

const findById = (id) => {
    return users.find(u => u.id === id);
};

const create = (userData) => {
    const newUser = {
        id: nextId++,
        ...userData
    };
    users.push(newUser);
    return newUser;
};

const update = (id, userData, isPartial = false) => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    if (isPartial) {
        // PATCH mantığı
        users[index] = { ...users[index], ...userData };
    } else {
        // PUT mantığı
        users[index] = { id, ...userData };
    }

    return users[index];
};

const remove = (id) => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    const deletedUser = users.splice(index, 1)[0];
    return deletedUser;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};