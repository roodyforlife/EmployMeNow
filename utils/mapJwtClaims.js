function mapJwtClaims(jwtClaims) {
    const mapping = {
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": "email",
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "role"
    };

    const result = {};
    for (const key in jwtClaims) {
        const mappedKey = mapping[key] || key;
        result[mappedKey] = jwtClaims[key];
    }
    return result;
}

export default mapJwtClaims;