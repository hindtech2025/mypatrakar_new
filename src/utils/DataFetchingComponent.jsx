export const errorHandller = (res) => {
    if (res.data.status === 201) {
        return res.data.message;
    }
    else if (res.data.status === 200) {
        return res.data.message;
    }
    else {
        return res.data.message;
    }
}