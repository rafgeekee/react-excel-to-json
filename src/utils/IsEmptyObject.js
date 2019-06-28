/**
 * Nice little helper without deps to check empty object
 * 
 * @param {Object} obj 
 */

export const isEmptyObject = (obj) => {
    return (Object.keys(obj).length === 0 && obj.constructor === Object);
};