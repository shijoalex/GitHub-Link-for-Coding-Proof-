import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

const Product = () => {
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState(searchParams.get('search') || '')
    let product

    switch (id) {
        case '1':
        case '101':
            product = {
                name: 'Product 1',
                price: '$899',
                description: 'This is a multi-line description for the first product.',
                features: ['High quality', 'Durable material'],
            }
            break
        case '2':
        case '102':
            product = {
                name: 'Product 2',
                price: '$129',
                description: 'Comfortable wireless headphones with clear sound.',
                features: ['Wireless design', 'Long battery life'],
            }
            break
        case '3':
        case '103':
            product = {
                name: 'Product 3',
                price: '$79',
                description: 'A compact keyboard for a comfortable workspace.',
                features: ['Compact layout', 'Quiet keys'],
            }
            break
        default:
            product = {
                name: 'Product not found',
                price: '-',
                description: 'No product exists for this ID.',
                features: [],
            }
    }

    const handleSearch = (event) => {
        event.preventDefault()
        if (search.trim()) {
            setSearchParams({ search: search.trim() })
        } else {
            setSearchParams({})
        }
    }

    return (
        <main className="product-page">
            <nav className="product-nav">
                <Link className="app-brand" to="/">ReactJs</Link>
                <div className="product-nav-links">
                    <Link to="/">Home</Link>
                    <Link to={`/product/${id}`}>Product</Link>
                    <Link to="/">About</Link>
                </div>
                <form className="product-search" onSubmit={handleSearch}>
                    <input
                        aria-label="Search"
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search"
                        value={search}
                    />
                    <button type="submit">Search</button>
                </form>
            </nav>
            <Link className="product-back" to="/">&larr; Back to home</Link>
            <section className="product-card" aria-labelledby="product-title">
                <p className="product-eyebrow">Product details</p>
                <h1 id="product-title">{product.name} Details</h1>
                <p className="product-description">{product.description}</p>
                <ul className="product-features">
                    {product.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <div className="product-meta">
                    <span>Product #{id || 'unknown'}</span>
                    <strong>{product.price}</strong>
                </div>
                {searchParams.get('search') && <p className="search-status">Searching for: <strong>{searchParams.get('search')}</strong></p>}
            </section>
        </main>
    )
}

export default Product