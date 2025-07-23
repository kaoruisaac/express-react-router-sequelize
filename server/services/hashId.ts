import Hash from 'hashids';

const { HASH_SALT } = process.env;
const hashId = new Hash(HASH_SALT, 10);
const hashIds = {
    decode: (hash) => Number(hashId.decode(hash)),
    encode: (id) => hashId.encode(id),
}; 

export default hashIds;
