package com.unitrade.notes.service;

import com.unitrade.notes.document.Note;
import com.unitrade.notes.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    // ADMIN
    public Note addNote(Note note) {
        return noteRepository.save(note);
    }

    // STUDENT
    public List<Note> getNotes(String college, String department, int semester) {
        return noteRepository.findByCollegeAndDepartmentAndSemester(
                college, department, semester
        );
    }
}
