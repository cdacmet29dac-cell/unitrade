package com.unitrade.notes.controller;

import com.unitrade.notes.document.Note;
import com.unitrade.notes.service.NoteService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    // ADMIN uploads notes
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Note uploadNote(@RequestBody Note note) {
        return noteService.addNote(note);
    }

    // STUDENT views notes
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_STUDENT')")
    public List<Note> getNotes(
            @RequestParam String college,
            @RequestParam String department,
            @RequestParam int semester
    ) {
        return noteService.getNotes(college, department, semester);
    }
}
