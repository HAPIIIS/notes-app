import React from "react";

class NotesInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
        };
    }

    onTitleChangeEventHandler = (event) => {
        this.setState({ title: event.target.value });
    };

    onBodyChangeEventHandler = (event) => {
        this.setState({ body: event.target.value });
    };

    onSubmitEventHandler = (event) => {
        event.preventDefault();
        this.props.addNotes(this.state);
        this.setState({ title: '', body: '' });
    };

    render() {
        return (
            <form onSubmit={this.onSubmitEventHandler}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                    <div className="sm:col-span-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-900">Title</label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm">
                                <input type="text" name="title" id="title" className="block flex-1 border-2 rounded-lg bg-transparent p-2 pl-1 text-gray-900 sm:text-sm" value={this.state.title} onChange={this.onTitleChangeEventHandler} maxLength={50}
                                />
                            </div>
                            <div className="mt-1 text-sm text-gray-600">
                                {this.state.title.length}/50 characters
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-full mt-2">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-900">Notes</label>
                    <div className="mt-2">
                        <textarea
                            id="about"
                            name="about"
                            rows="3"
                            className="block w-full rounded-md border-2 p-2 text-gray-900 shadow-sm sm:text-sm"
                            value={this.state.body}
                            onChange={this.onBodyChangeEventHandler}
                            required
                        ></textarea>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="submit" className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600">
                        Save
                    </button>
                </div>
            </form>
        );
    }
}

export default NotesInput;