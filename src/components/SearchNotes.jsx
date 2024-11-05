import React from 'react';
import { Search } from 'lucide-react';

class SearchNotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };
    }

    handleChange = (event) => {
        this.setState({ query: event.target.value });
        this.props.onSearch(event.target.value);
    };

    render() {
        return (
            <div className="mt-4">
                <label htmlFor="search" className="block text-sm font-medium text-gray-900">Search Notes</label>
                <div className="relative mt-1">
                    <Search className="absolute left-3 top-2 text-gray-400" size={18} />
                    <input
                        type="text"
                        id="search"
                        className="block w-full border-2 rounded-lg bg-transparent p-2 pl-8 text-gray-900 sm:text-sm"
                        placeholder="Search by title or content..."
                        value={this.state.query}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }
}

export default SearchNotes;
