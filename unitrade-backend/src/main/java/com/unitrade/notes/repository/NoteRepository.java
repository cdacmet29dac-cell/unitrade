package com.unitrade.notes.repository;

import com.unitrade.notes.document.Note;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NoteRepository extends MongoRepository<Note, String> {

    List<Note> findByCollegeAndDepartmentAndSemester(
            String college,
            String department,
            int semester
    );
}
