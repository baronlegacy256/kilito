const hash = '$2b$10$Y53W8OhuEH7/Z.rdVBSvJO8bj/uDK8984hxtFLSWtZzfO0b4eEgBa';
console.log('Original Hash Length:', hash.length);
console.log('Base64:', Buffer.from(hash).toString('base64'));
