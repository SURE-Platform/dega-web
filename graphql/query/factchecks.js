const factcheck = `
    _id
    title
    excerpt
    published_date
    slug
    media {
        url
        alt_text
    }
    categories {
        _id
        name
        slug
    }
    _class
`;

const claims = `
    claims {
        claim
        description
        review
        claimant {
            name
            media {
                url
                alt_text
            }
        }
        rating {
            numeric_value
            media {
                url
                alt_text
            }
        }
    }
`;

const tags = `
    tags {
        _id
        name
        slug
    }
`;

/* export factcheck query by id */
export const factcheckQuery = `
query factcheckById($id: String!) {
    factcheck(id: $id) {
        introduction
        updates
        ${factcheck}
        ${claims}
        degaUsers {
            _id
            display_name
            slug
            media {
                url
                alt_text
            }
        }
        ${tags}
    }
}
`;

/* export factchecks query for list page */
export const pagingQuery = `
factchecks(
    limit: $limit
    page: $page
    categories: $category
    tags: $tag
    users: $user
    sortBy: $sortBy
    sortOrder: $sortOrder 
) {
    nodes {
        ${factcheck}
        degaUsers {
            _id
            display_name
            slug
        }
    }
    total
}
`;

/* export factchecks query for single page */
export const singlePageQuery = `
factchecks(
    limit: $limit
    page: $page
    categories: $category
    tags: $tag
    users: $user
    sortBy: $sortBy
    sortOrder: $sortOrder 
) {
    nodes {
        introduction
        updates
        ${factcheck}
        ${claims}
        degaUsers {
            _id
            display_name
            slug
            media {
                url
                alt_text
            }
        }
        ${tags}
    }
    total
}
`;
