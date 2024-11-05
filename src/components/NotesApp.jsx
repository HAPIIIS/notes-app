import React from "react";
import TabbedNavigation from "./TabbedNavigation";
import NoteCard from "./NotesCard";
import getData from '../utils/data';
import SortNotes from "./SortNotes";
import NotesInput from "./NotesInput";
import SearchNotes from "./SearchNotes";

class NotesApp extends React.Component {
    constructor(props) {
        super(props);
        const notes = getData();
        this.state = {
            notes,
            activeTab: 'notes',
            sortOption: 'Newest',
            searchQuery: ''
        };
    }
    
    onDeleteHandler = (id) => {
        this.setState((prevState) => ({
            notes: prevState.notes.filter(note => note.id !== id)
        }));
    };

    onTabChange = (tabId) => {
        this.setState({ activeTab: tabId });
    };

    handleSortChange = (sortOption) => {
        this.setState({ sortOption });
    };

    handleSearch = (query) => {
        this.setState({ searchQuery: query });
    };

    getSortedNotes = () => {
        const { notes, sortOption } = this.state;
        return [...notes].sort((a, b) => {
            if (sortOption === 'Newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
        });
    };

    toggleArchived = (id) => {
        this.setState((prevState) => {
            const updatedNotes = prevState.notes.map(note => 
                note.id === id ? { ...note, archived: !note.archived } : note
            );
            return { notes: updatedNotes };
        });
    };

    addNotes = (note) => {
        const newNote = {
            id: Date.now(),
            title: note.title,
            body: note.body,
            createdAt: new Date().toISOString(),
            archived: false,
        };

        this.setState((prevState) => ({
            notes: [...prevState.notes, newNote]
        }));
    };

    getEmptyStateMessage = () => {
        const { activeTab } = this.state;
        switch (activeTab) {
            case 'archived':
                return 'No archived notes available.';
            case 'notes':
            default:
                return 'No notes available.';
        }
    };

    render() {
        const sortedNotes = this.getSortedNotes();
        const { activeTab, searchQuery } = this.state;

        const displayedNotes = sortedNotes.filter(note => {
            const isSearching = note.title.toLowerCase().includes(searchQuery.toLowerCase());
            if (activeTab === 'archived') return note.archived && isSearching;
            return !note.archived && isSearching;
        });

        return (
            <div className="container mx-auto px-4">
                <TabbedNavigation 
                    activeTab={activeTab} 
                    onTabChange={this.onTabChange} 
                />
                <NotesInput addNotes={this.addNotes} />
                <SearchNotes onSearch={this.handleSearch} />
                <SortNotes
                    sortOption={this.state.sortOption}
                    onSortChange={this.handleSortChange}
                />
                <div className="notes-list">
                    {displayedNotes.length === 0 ? (
                        <p className="text-gray-500 text-center font-semibold">{this.getEmptyStateMessage()}</p>
                    ) : (
                        displayedNotes.map(note => (
                            <NoteCard 
                                key={note.id}
                                id={note.id}
                                title={note.title}
                                body={note.body}
                                createdAt={note.createdAt}
                                archived={note.archived}
                                onArchiveToggle={this.toggleArchived}
                                onDeleteToggle={this.onDeleteHandler}
                            />
                        ))
                    )}
                </div>
            </div>
        );
    }
}

export default NotesApp;
