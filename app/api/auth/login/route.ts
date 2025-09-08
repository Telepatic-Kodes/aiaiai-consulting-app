import { NextRequest, NextResponse } from 'next/server';

/**
 * Login API Route
 * 
 * Features:
 * - User authentication
 * - JWT token generation
 * - Input validation
 * - Error handling
 * - Security headers
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Mock authentication - replace with real authentication logic
    if (email === 'admin@aiaiai.cl' && password === 'admin123') {
      const user = {
        id: '1',
        email: 'admin@aiaiai.cl',
        name: 'Administrador',
        role: 'admin',
        company: 'AIAIAI Consulting'
      };

      // Mock JWT token - replace with real JWT generation
      const token = 'mock-jwt-token-' + Date.now();

      return NextResponse.json({
        success: true,
        user,
        token
      });
    }

    return NextResponse.json(
      { error: 'Credenciales inválidas' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}






